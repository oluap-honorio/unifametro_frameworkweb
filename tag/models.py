from django.db import models
import uuid


class Tag(models.Model):
    
    serial = models.CharField(max_length=16, unique=True)
    id = models.UUIDField(    primary_key=True,default=uuid.uuid4,null=False,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.serial

        id = models.UUIDField(    primary_key=True,default=uuid.uuid4,null=False,blank=True)