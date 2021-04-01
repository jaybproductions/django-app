from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, LeadSerializer, CreateLeadSerializer
from .models import Room, Lead
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
# Create your views here.

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class LeadView(generics.ListAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class GetRoom(APIView): 
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None: 
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code not found in request'}, status=status.HTTP_400_BAD_REQUEST)



class JoinRoom(APIView): 
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
    
        return Response({'Bad Request': 'Invalid Post Data, did not code'}, status=status.HTTP_400_BAD_REQUEST)




class UserInRoom(APIView): 
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        data = {
            'code': self.request.session.get('room_code')
        }

        return JsonResponse(data, status=status.HTTP_200_OK)



class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                self.request.session['room_code'] = room.code
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code


            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid Data...'}, status=status.HTTP_400_BAD_REQUEST)

class CreateLeadView(APIView):
    
    serializer_class = CreateLeadSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            phone_number = serializer.data.get('phone_number')
            email = serializer.data.get('email')
            business_name = serializer.data.get('business_name')
            lead = Lead(first_name=first_name, last_name=last_name, email=email, phone_number=phone_number, business_name=business_name)
            lead.save()
            
            return Response(CreateLeadSerializer(lead).data, status=status.HTTP_200_OK)


class DeleteLeadView(APIView):
    serializer_class = CreateLeadSerializer
    lookup_url_kwargs = 'id'
    def delete(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            id = request.data.get(self.lookup_url_kwargs)
            Lead.objects.filter(id=id).delete()
            return Response({"Lead was deleted"}, status=status.HTTP_200_OK)
        return Response({"Bad request": "Lead could not be deleted"}, status=status.HTTP_400_BAD_REQUEST)



