from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Match, Category, Highlight, MatchTicket, Order, CartItem, Profile, News, ShopItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'team1', 'team2', 'team1_logo', 'team2_logo', 'stadium', 'date', 'time', 'league']

class CategorySerializer(serializers.ModelSerializer):
    match = MatchSerializer(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'price', 'available_seats', 'match']

class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = '__all__'

class MatchTicketSerializer(serializers.ModelSerializer):
    match = MatchSerializer(read_only=True)

    class Meta:
        model = MatchTicket
        fields = ['id', 'user', 'match', 'seat_category', 'booked_at']

class ShopItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopItem
        fields = ['id', 'name', 'price', 'stock', 'image', 'category']

class CartItemSerializer(serializers.ModelSerializer):
    shop_item = ShopItemSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            'id',
            'user',
            'cart_type',
            'shop_item',
            'category',
            'quantity',
            'added_at',
            'total_price',
        ]

    def get_total_price(self, obj):
        return obj.get_total_price()

class OrderSerializer(serializers.ModelSerializer):
    cart_details = serializers.JSONField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'cart_details', 'confirmation_number', 'status', 'ordered_at', 'total_price']

    def get_total_price(self, obj):
        return obj.calculate_total()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'
