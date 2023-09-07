from datetime import datetime
from typing import Optional,List
from pydantic import BaseModel
from uuid import UUID, uuid4


now = datetime.now()
datestring  = now.strftime("%Y-%m-%d")

class Admins(BaseModel):
    adminID:int
    email :str
    password: str

class User(BaseModel):
    userID: int
    username: str
    password: str
    email: str
    
class Books(BaseModel):
    bookID: int
    title :str
    author:str
    genre:str
    price:float
    
class Orders(BaseModel):
    id: int
    bookID: str
    orderdate: datetime
    orderamount:int
    
class CartItem(BaseModel):
    id: int
    title: str
    price: float
    amount: int