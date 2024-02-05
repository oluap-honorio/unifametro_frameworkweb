from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import TagSerializer
from .models import Tag


class TagViewSet(viewsets.ModelViewSet):
  queryset = Tag.objects.all()
  serializer_class = TagSerializer
  permission_classes = [permissions.IsAuthenticated]