from fastapi import FastAPI,HTTPException
from typing import List
import db_helper
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import json
from Modal import Orders, User, Books, Admins,CartItem

app  = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

orders: List[User] = [
    
]

@app.get('./')
async def root():
    return {"message": "Hello World"}



'''Function for Books'''
@app.get('/get_books/')
async def get_books():
    try:
        books =  db_helper.get_books()
        return {"books":books}
    except:
        raise HTTPException(status_code=404, detail="Books not found")
    
@app.get('/search_book/{keyword}')
async def search_book(keyword):
    try:
        books = db_helper.search_book(keyword)
        return {"books":books}
    except:
        raise HTTPException(status_code=404, detail="Books not found")


"functions for orders"
@app.post('/add_order/')
async def add_order():
    order = db_helper.make_order()
    return {"order":order}

# @app.get('/get_orders/')
# async def get_order():
#     orders = db_helper.get_orders()
#     return {"orders":orders}

# @app.delete('/remove_order/{order_id}')
# async def delete_order(order_id):
#     order_status = db_helper.remove_order(order_id)
#     return {"order_id":order_status}


"for cart"

@app.get('/get_cartitems/')
async def get_order():
    cartitems = db_helper.get_orders()
    return {"cartitems":cartitems}

@app.post('/add_cart/')
async def add_cart(cart:CartItem):
    cart = db_helper.add_cart(cart)
    return {"cart":cart}

@app.delete('/delete_cart/{cart_item_id}')
async def delete_cart(cart_item_id):
    cart = db_helper.delete_cart(cart_item_id)
    return {"cart":cart}