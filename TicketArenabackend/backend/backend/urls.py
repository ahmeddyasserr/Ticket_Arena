from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('reset_password/', views.reset_password, name='reset_password'),
    path('logout/', views.logout, name='logout'),
   
]
