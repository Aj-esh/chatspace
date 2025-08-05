from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from .models import Room
import uuid

# Create your views here.
def home_view(request):
    return render(request, 'chat/home.html')

def room_view(request, room_addr):
    try:
        room = Room.objects.get(addr=room_addr)
        return render(
            request=request,
            template_name='chat/room.html',
            context={
                'room_addr': room_addr,
                'username': request.user.username
        })
    
    except Room.DoesNotExist:
        return redirect('chat:home')

@login_required
def create_room(request):
    if request.method == 'POST':
        # Generate a unique room address
        addr = uuid.uuid4().hex
        Room.objects.create(addr=addr, created_by=request.user)

        return JsonResponse({
            'status' : 'success',
            'room_addr': addr
        })
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method.'
    })