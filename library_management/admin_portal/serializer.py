from rest_framework import serializers
from . models import Account,BooksRecord


# Account serializer for account json response
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields="__all__"


# Book serializer for bookrecord model json response    
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model=BooksRecord
        fields="__all__"