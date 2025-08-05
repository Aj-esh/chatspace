from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.
class Room (models.Model):
    addr = models.CharField(max_length=32, default=uuid.uuid4, unique=True, editable=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_spaces')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.addr
