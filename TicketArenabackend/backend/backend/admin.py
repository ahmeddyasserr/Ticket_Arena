from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Match, Category, Highlight, MatchTicket, Order, Profile, News, ShopItem, CartItem


# Inline for Categories
class CategoryInline(admin.TabularInline):
    model = Category
    extra = 1


# Match Admin
@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('team1', 'team2', 'league', 'stadium', 'date', 'time')
    list_filter = ('league', 'stadium', 'date')
    search_fields = ('team1', 'team2', 'stadium')
    inlines = [CategoryInline]


# Highlight Admin
@admin.register(Highlight)
class HighlightAdmin(admin.ModelAdmin):
    list_display = ('match_name', 'video_url', 'created_at')
    search_fields = ('match_name',)


# Inline for Tickets
class MatchTicketInline(admin.TabularInline):
    model = MatchTicket
    extra = 0
    readonly_fields = ('match', 'seat_category', 'booked_at')


# Inline for Orders
class OrderInline(admin.TabularInline):
    model = Order
    extra = 0
    readonly_fields = ('item_name', 'quantity', 'price', 'ordered_at')


# Inline for Profiles
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'


# Custom User Admin to include related models
class CustomUserAdmin(UserAdmin):
    inlines = [ProfileInline, MatchTicketInline, OrderInline]


# Unregister the default UserAdmin and register the custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


# News Admin
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_at', 'original_url')
    search_fields = ('title',)


# ShopItem Admin
@admin.register(ShopItem)
class ShopItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')  # Include category in list
    search_fields = ('name',)
    list_filter = ('category', 'stock')  # Add category to filters


# CartItem Admin
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'cart_type', 'shop_item', 'category', 'quantity', 'added_at')
    search_fields = (
        'user__username',
        'shop_item__name',
        'category__name',
        'category__match__team1',
        'category__match__team2',
    )
    list_filter = ('cart_type', 'added_at')
