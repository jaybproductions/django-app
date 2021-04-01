from django.db import models
import string
import random

def generate_unique_code(): 
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

class Lead(models.Model):
    first_name = models.CharField(max_length=20, default="", unique=False)
    last_name = models.CharField(max_length=20, default="", unique=False)
    email = models.CharField(max_length=20, default="", unique=False)
    phone_number = models.CharField(max_length=15, default="", unique=False)
    business_name = models.CharField(max_length=30, default="", unique=False)
    created_at = models.DateTimeField(auto_now_add=True)


