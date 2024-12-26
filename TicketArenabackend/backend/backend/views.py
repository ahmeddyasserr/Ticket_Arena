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
import random
import string  



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

#sign up

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


@api_view(['GET', 'PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    if request.method == 'GET':
        profile = request.user.profile
        return Response({
            "username": request.user.username,
            "email": request.user.email,
            "league": profile.league,
            "favorite_team": profile.favorite_team,
        })

    elif request.method == 'PUT':
        data = request.data
        profile = request.user.profile
        request.user.username = data.get('username', request.user.username)
        request.user.email = data.get('email', request.user.email)
        profile.league = data.get('league', profile.league)
        profile.favorite_team = data.get('favorite_team', profile.favorite_team)
        request.user.save()
        profile.save()
        return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)


#news api
@api_view(['GET'])
def get_news(request):
    news_items = News.objects.all()
    serializer = NewsSerializer(news_items, many=True, context={'request': request})  # Pass the request to serializer
    return Response(serializer.data)


# shop items
@api_view(['GET'])
def get_shop_items(request):
    
    try:
        shop_items = ShopItem.objects.all()
        serializer = ShopItemSerializer(shop_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# add shop items to the cart
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_to_shop_cart(request):
    
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

# remove shop items from the cart
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_from_shop_cart(request, item_id):
   
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
    


#add tickets to the cart
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_to_ticket_cart(request):
    
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

#delete tickets from the cart
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_from_ticket_cart(request, item_id):
    
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

#cart 
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_carts(request):
    
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


#checkout
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def checkout(request):
    
    try:
        user = request.user
        confirmation_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
        cart_items = CartItem.objects.filter(user=user)

        if not cart_items.exists():
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate total price
        total_price = sum(float(item.get_total_price()) for item in cart_items)

        # Prepare cart details
        cart_details = []
        for item in cart_items:
            if item.cart_type == 'shop' and item.shop_item:
                cart_details.append({
                    "item_name": item.shop_item.name,
                    "category": item.shop_item.category,
                    "price": float(item.shop_item.price),  # Convert to float
                    "quantity": item.quantity,
                    "total": float(item.get_total_price()),  # Convert to float
                    "image": request.build_absolute_uri(item.shop_item.image.url) if item.shop_item.image else None
                })
            elif item.cart_type == 'ticket' and item.category:
                cart_details.append({
                    "item_name": f"{item.category.match.team1} vs {item.category.match.team2}",
                    "category": item.category.name,
                    "price": float(item.category.price),  # Convert to float
                    "quantity": item.quantity,
                    "total": float(item.get_total_price()),  # Convert to float
                    "team1_logo": request.build_absolute_uri(item.category.match.team1_logo.url) if item.category.match.team1_logo else None,
                    "team2_logo": request.build_absolute_uri(item.category.match.team2_logo.url) if item.category.match.team2_logo else None,
                })

        # Create the order
        order = Order.objects.create(
            user=user,
            confirmation_number=confirmation_number,
            cart_details=cart_details,
            status='pending'
        )

        # Clear cart after checkout
        cart_items.delete()

        return Response({
            "message": "Checkout successful.",
            "confirmation_number": confirmation_number,
            "total_price": total_price,
            "cart_details": cart_details,
            "status": "pending"
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# orders
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user)
    serialized_orders = []
    for order in orders:
        serialized_orders.append({
            "confirmation_number": order.confirmation_number,
            "status": order.status,
            "items": order.cart_details,  
            "total_price": order.calculate_total(),
        })
    return Response(serialized_orders, status=status.HTTP_200_OK)
