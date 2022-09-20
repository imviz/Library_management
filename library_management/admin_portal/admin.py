from django.contrib import admin
from .models import Account,BooksRecord

# used for viewing inbuild admin panel we have to register here
admin.site.register(Account)
admin.site.register(BooksRecord)


