from django.db import models
from tag.models import Tag


class Ovino(models.Model):
    
    tag = models.OneToOneField(Tag, on_delete=models.SET_NULL, null=True)