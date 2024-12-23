# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Match(models.Model):
    LEAGUE_CHOICES = [
        ('spain_league', 'La Liga'),
        ('german_league', 'Bundesliga'),
        ('england_league', 'Premier League'),
        ('france_league', 'Ligue 1'),
        ('italy_league', 'Serie A'),
        ('champions_league', 'Champions League'),
    ]

    team1 = models.CharField(max_length=50)
    team2 = models.CharField(max_length=50)
    team1_logo = models.ImageField(upload_to="logos/", null=True, blank=True)
    team2_logo = models.ImageField(upload_to="logos/", null=True, blank=True)
    date = models.DateField()
    time = models.TimeField()
    stadium = models.CharField(max_length=100)
    league = models.CharField(max_length=50, choices=LEAGUE_CHOICES)

    def __str__(self):
        return f"{self.team1} vs {self.team2}"

class Category(models.Model):
    match = models.ForeignKey(Match, related_name='categories', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)  # VIP, Regular, Economic
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available_seats = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.match}"

class Highlight(models.Model):
    match_name = models.CharField(max_length=255)
    video_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.match_name

class MatchTicket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tickets")
    match = models.ForeignKey(Match, on_delete=models.CASCADE)  # Link to Match model
    seat_category = models.CharField(max_length=50)  # Category of the seat
    booked_at = models.DateTimeField(default=now)  # Timestamp of booking

    def __str__(self):
        return f"{self.user.username} - {self.match} - {self.seat_category}"
    


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('denied', 'Denied'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    items = models.ManyToManyField('CartItem', blank=True)  # Still store relationships
    cart_details = models.JSONField(null=True, blank=True)  # Store the full cart details
    confirmation_number = models.CharField(max_length=12, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    ordered_at = models.DateTimeField(default=now)

    def calculate_total(self):
        """Calculate the total price of the order."""
        return sum(item['total'] for item in self.cart_details) if self.cart_details else 0

    def __str__(self):
        return f"Order {self.confirmation_number} - {self.user.username}"


class ShopItem(models.Model):
    CATEGORY_CHOICES = [
        ("T-Shirt", "T-Shirt"),
        ("Shoes", "Shoes"),
        ("Accessories", "Accessories"),
        ("Others", "Others"),
    ]

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to="shop_items/", null=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Others")

    def __str__(self):
        return self.name
    


class CartItem(models.Model):
    CART_TYPE_CHOICES = [
        ('shop', 'Shop Item'),
        ('ticket', 'Match Ticket'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart_items", default=None)
    cart_type = models.CharField(max_length=10, choices=CART_TYPE_CHOICES, default='shop')
    shop_item = models.ForeignKey(ShopItem, on_delete=models.CASCADE, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(default=now)

    def get_total_price(self):
        """Calculate the total price of this cart item."""
        if self.cart_type == 'shop' and self.shop_item:
            return self.shop_item.price * self.quantity
        elif self.cart_type == 'ticket' and self.category:
            return self.category.price * self.quantity
        return 0

    def __str__(self):
        if self.cart_type == 'shop' and self.shop_item:
            return f"Shop Cart: {self.shop_item.name} x {self.quantity}"
        elif self.cart_type == 'ticket' and self.category:
            return f"Ticket Cart: {self.category.match} - {self.category.name} x {self.quantity}"
        return "Cart Item"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    league = models.CharField(max_length=50)
    favorite_team = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.username}'s Profile"

class News(models.Model):
    title = models.CharField(max_length=255)
    published_at = models.DateField()
    image = models.ImageField(upload_to='news_images/')
    original_url = models.URLField()

    def __str__(self):
        return self.title