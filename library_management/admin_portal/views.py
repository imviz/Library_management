from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from .models import Account, BooksRecord
from rest_framework  import status
from .serializer import AccountSerializer,BookSerializer
from rest_framework import viewsets


# admin register   view

@api_view(['POST'])
def admin_register(request):
    try:
        data=request.data
        name=data['name']
        username=data['username']
        email=data['email']
        password=data['password']
        confirm_password=data['confirm_password']

        # validatations for blank
        if email=='' or name=='' or name ==''  or password=='' or confirm_password=='':
            message={'error':' fill the blanks'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
        # validation for password matching
        elif password!=confirm_password:
            message={'error':'password missmatch'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
        # for password length check
        elif len(password)<6:
            message={'error':'password contain min 6 charector'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
        
        # checking the email is already exist or not
        elif Account.objects.filter(email=email).exists():
            message={'error':'This email is already exist'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
            
        # creating a object of Account model for signup 
        user=Account.objects.create(
            name=name,
            username=username,
            email=email,
            password=make_password(password),
            is_admin=True,
            is_staff=True,                    
        )
        serializere=AccountSerializer(user,many=False)
        return Response(serializere.data)
    except:
        message={'error':'there is a error occure'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    
    

# we can used class based view function based view also,but i did as viewset for simplify the code with in few line

# add book to library,all crud operation of booktable was done using this way
class BookRecordViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = BooksRecord.objects.all()
    serializer_class = BookSerializer


# only the student view for viewing students at home page (no authentication gived)
class BookRecordViewSetForStudent(viewsets.ModelViewSet):
    queryset = BooksRecord.objects.all()
    serializer_class = BookSerializer
