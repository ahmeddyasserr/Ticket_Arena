from django.contrib import admin
from django.utils.html import mark_safe
from .models import Match, Category, Highlight, MatchTicket, Order, Profile, News, ShopItem, CartItem
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

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
    readonly_fields = ('confirmation_number', 'ordered_at', 'status', 'calculate_total')
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'confirmation_number', 'status', 'ordered_at', 'calculate_total')
    readonly_fields = ('confirmation_number', 'ordered_at', 'formatted_cart_details', 'calculate_total')
    list_filter = ('status',)
    search_fields = ('confirmation_number', 'user__username')

    def calculate_total(self, obj):
        """Retrieve the total price of the order."""
        return f"${obj.calculate_total():.2f}"

    calculate_total.short_description = "Total Price"

    def formatted_cart_details(self, obj):
        """Format the cart details into a readable HTML format."""
        if not obj.cart_details:
            return "No items"

        details = "<ul>"
        for item in obj.cart_details:
            details += f"""
                <li>
                    <strong>{item['item_name']}</strong><br>
                    Category: {item['category']}<br>
                    Price: ${item['price']}<br>
                    Quantity: {item['quantity']}<br>
                    Total: ${item['total']}
                </li>
                <hr>
            """
        details += "</ul>"
        return mark_safe(details)

    formatted_cart_details.short_description = "Cart Details"

# Profile Admin
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'

# User Admin
class CustomUserAdmin(UserAdmin):
    inlines = [ProfileInline, OrderInline]

# News Admin
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_at', 'original_url')
    search_fields = ('title',)

# ShopItem Admin
@admin.register(ShopItem)
class ShopItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category')
    search_fields = ('name',)
    list_filter = ('category', 'stock')

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

# Unregister the default User admin and register the customized one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)




