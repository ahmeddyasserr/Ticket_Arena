from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.http import JsonResponse
from .models import Match, Category, Highlight, MatchTicket, Order, CartItem, Profile, News,ShopItem
from django.db import transaction

from .serializers import (
    UserSerializer,
    MatchSerializer,
    CategorySerializer,
    HighlightSerializer,
    MatchTicketSerializer,
    OrderSerializer,
    CartItemSerializer,
    NewsSerializer,
    ShopItemSerializer,
    CartItemSerializer
)
from django.db import transaction


@api_view(['POST'])
def signup(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        league = request.data.get('league')
        favorite_team = request.data.get('favorite_team')

        # Validation
        if not username or not email or not password or not confirm_password:
            return JsonResponse({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            return JsonResponse({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Use transaction to ensure atomicity
        with transaction.atomic():
            # Create user
            user = User.objects.create_user(username=username, email=email, password=password)

            # Create profile
            Profile.objects.create(user=user, league=league, favorite_team=favorite_team)

            # Generate authentication token
            token, _ = Token.objects.get_or_create(user=user)

        return JsonResponse({
            "message": "Signup successful.",
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "league": league,
                "favorite_team": favorite_team
            }
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# User Login
@api_view(['POST'])
def login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=user.username, password=password)
        if not user:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Reset Password
@api_view(['POST'])
def reset_password(request):
    try:
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not email or not new_password or not confirm_password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        user.set_password(new_password)
        user.save()
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Logout
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Get Matches
@api_view(['GET'])
def get_matches(request):
    matches = Match.objects.all()
    serializer = MatchSerializer(matches, many=True)
    return Response(serializer.data)

# Get Categories
@api_view(['GET'])
def get_categories(request, match_id):
    try:
        match = Match.objects.get(id=match_id)
        categories = Category.objects.filter(match=match)
        serializer = CategorySerializer(categories, many=True)
        return Response({
            "match": MatchSerializer(match).data,
            "categories": serializer.data
        })
    except Match.DoesNotExist:
        return Response({"error": "Match not found."}, status=status.HTTP_404_NOT_FOUND)

# Get Highlights
@api_view(['GET'])
def get_highlights(request):
    highlights = Highlight.objects.all()
    serializer = HighlightSerializer(highlights, many=True)
    return Response(serializer.data)

# Cart Management
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_cart_items(request):
    cart_items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    serializer = CartItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    try:
        item = CartItem.objects.get(id=item_id, user=request.user)
        item.delete()
        return Response({"message": "Item removed from cart."}, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)

# Get User Tickets
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_tickets(request):
    tickets = MatchTicket.objects.filter(user=request.user)
    serializer = MatchTicketSerializer(tickets, many=True)
    return Response(serializer.data)

# Get User Orders
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# Add Order
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_order(request):
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get User Profile
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    profile = request.user.profile
    serializer = UserSerializer(profile.user)
    return Response(serializer.data)

@api_view(['GET'])
def get_news(request):
    news_items = News.objects.all()
    serializer = NewsSerializer(news_items, many=True, context={'request': request})  # Pass the request to serializer
    return Response(serializer.data)



@api_view(['GET'])
def get_shop_items(request):
    """Fetch all shop items."""
    try:
        shop_items = ShopItem.objects.all()
        serializer = ShopItemSerializer(shop_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_to_shop_cart(request):
    """Add shop items to the shop cart."""
    try:
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User must be logged in to add items to the shop cart."}, status=status.HTTP_401_UNAUTHORIZED)

        item_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity", 1))

        if not item_id:
            return Response({"error": "Item ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch Shop Item
        try:
            shop_item = ShopItem.objects.get(id=item_id)
        except ShopItem.DoesNotExist:
            return Response({"error": "Shop item not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check stock
        if shop_item.stock < quantity:
            return Response({"error": "Insufficient stock available."}, status=status.HTTP_400_BAD_REQUEST)

        # Add to Cart
        cart_item, created = CartItem.objects.get_or_create(
            user=user,
            shop_item=shop_item,
            defaults={"quantity": 0}
        )

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()

        # Update stock
        shop_item.stock -= quantity
        shop_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_from_shop_cart(request, item_id):
    """Remove shop items from the shop cart and restore stock."""
    try:
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

        cart_item = CartItem.objects.get(id=item_id, user=user, shop_item__isnull=False)

        # Restore stock
        shop_item = cart_item.shop_item
        shop_item.stock += cart_item.quantity
        shop_item.save()

        cart_item.delete()
        return Response({"message": "Shop item removed from cart."}, status=status.HTTP_200_OK)

    except CartItem.DoesNotExist:
        return Response({"error": "Shop item not found in cart."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_to_ticket_cart(request):
    """Add match tickets to the ticket cart."""
    try:
        user = request.user

        item_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity", 1))

        if not item_id:
            return Response({"error": "Item ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch Match Category
        try:
            category = Category.objects.get(id=item_id)
        except Category.DoesNotExist:
            return Response({"error": "Match category not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check available seats
        if category.available_seats < quantity:
            return Response({"error": "Insufficient seats available."}, status=status.HTTP_400_BAD_REQUEST)

        # Add to Cart
        cart_item, created = CartItem.objects.get_or_create(
            user=user,
            cart_type="ticket",
            category=category,
            defaults={"quantity": 0}
        )

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()

        # Update available seats
        category.available_seats -= quantity
        category.save()

        return Response(
            {
                "message": "Ticket added to cart.",
                "cart_item": CartItemSerializer(cart_item).data
            },
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_from_ticket_cart(request, item_id):
    """Remove match tickets from the ticket cart and restore available seats."""
    try:
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

        # Find the cart item belonging to the user
        cart_item = CartItem.objects.get(id=item_id, user=user, cart_type='ticket')

        # Restore available seats
        if cart_item.category:  # Ensure the category exists
            category = cart_item.category
            category.available_seats += cart_item.quantity
            category.save()

        # Delete the cart item
        cart_item.delete()
        return Response({"message": "Ticket removed from cart."}, status=status.HTTP_200_OK)

    except CartItem.DoesNotExist:
        return Response({"error": "Ticket not found in cart."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_carts(request):
    """Fetch items in both the shop and ticket carts."""
    try:
        user = request.user

        # Filter cart items by type
        shop_cart_items = CartItem.objects.filter(user=user, cart_type="shop")
        ticket_cart_items = CartItem.objects.filter(user=user, cart_type="ticket")

        # Serialize cart items
        shop_serializer = CartItemSerializer(shop_cart_items, many=True)
        ticket_serializer = CartItemSerializer(ticket_cart_items, many=True)

        # Return response
        return Response({
            "shop_cart": shop_serializer.data,
            "ticket_cart": ticket_serializer.data
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


