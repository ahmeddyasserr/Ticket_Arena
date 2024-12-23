from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    # Admin URLs
    path('admin/', admin.site.urls),

    # Authentication APIs
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('reset_password/', views.reset_password, name='reset_password'),
    path('logout/', views.logout, name='logout'),

    # Matches APIs
    path('matches/', views.get_matches, name='matches'),
    path('matches/<int:match_id>/categories/', views.get_categories, name='categories'),

    # Highlights API
    path('highlights/', views.get_highlights, name='highlights'),

    # News API
    path('news/', views.get_news, name='get_news'),

    # Shop APIs
    path('shop/', views.get_shop_items, name='get_shop_items'),

    # Shop Cart APIs
    path('shop_cart/add/', views.add_to_shop_cart, name='add_to_shop_cart'),
    path('shop_cart/remove/<int:item_id>/', views.remove_from_shop_cart, name='remove_from_shop_cart'),

    # Ticket Cart APIs
    path('ticket_cart/add/', views.add_to_ticket_cart, name='add_to_ticket_cart'),
    path('ticket_cart/remove/<int:item_id>/', views.remove_from_ticket_cart, name='remove_from_ticket_cart'),

    # Get Both Carts
    path('carts/', views.get_carts, name='get_carts'),

    # Checkout API
    path('checkout/', views.checkout, name='checkout'),

    # User Orders API
    path('user/orders/', views.get_user_orders, name='user_orders'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
