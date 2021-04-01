from rest_framework import serializers
from .models import Room, Lead

class RoomSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 
                    'votes_to_skip', 'created_at')
        
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')


class LeadSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Lead
        fields = ('id', 'first_name', 'last_name', 'email', 'phone_number', 'business_name', 'created_at')
class CreateLeadSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Lead
        fields = ('first_name', 'last_name', 'email', 'phone_number', 'business_name')