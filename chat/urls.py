from django.urls import path
from . import views

app_name = "chat"

urlpatterns = [
    path('', views.home_view, name='home'),
    path('create_room/', views.create_room, name='create_room'),
    path('<str:room_addr>/', views.room_view, name='room')
]