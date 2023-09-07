import mysql.connector
from datetime import datetime
from Modal import Orders, CartItem

global cnx

cnx = mysql.connector.connect(
    host='localhost',
    user='root',
    password='mysql123',
    database='bookstore'
)

cur = cnx.cursor()
now = datetime.now()
datestring = now.strftime("%Y-%m-%d")


def get_books():
    cur.execute("SELECT * FROM book")
    rows = cur.fetchall()
    return rows


def get_cart():
    cur.execute("SELECT * FROM cart")
    rows = cur.fetchall()
    return rows


def search_book(keyword):
    sql = "SELECT * FROM book WHERE title LIKE %s"
    keyword_with_wildcards = f"%{keyword}%"
    cur.execute(sql, (keyword_with_wildcards,))
    rows = cur.fetchall()

    if not rows:
        return {"message": "Books not found"}

    return rows


# def add_order(order:Orders):
#     try:
#         insert_query = ("INSERT INTO orders "
#                         "(orderID, bookID, orderdate, orderamount) "
#                         "VALUES (%s, %s, %s, %s)")
#         orderdate_str = order.orderdate.strftime('%Y-%m-%d %H:%M:%S')
#         order_data = (order.orderID, order.bookID, orderdate_str, order.orderamount, order.userID)
#         cur.execute(insert_query, order_data)
#         cnx.commit()

#         return {"message": "Order added successfully", "order": order}
#     except Exception as e:
#         return {"message": f"Error: {str(e)}"}


# def remove_order(order_id):
#     sql_select = "SELECT * FROM orders WHERE orderID = %s"
#     sql_delete = "DELETE FROM orders WHERE orderID = %s"
#     try:
#         cur.execute(sql_select, (order_id,))
#         order = cur.fetchone()
#         print(order)
#         if order is None:
#             return {"message": "Order not found"}
#         cur.execute(sql_delete, (order_id,))
#         cnx.commit()
#         return {"message": "Order removed successfully"}
#     except Exception as e:
#         print(f"Error executing query: {e}")


def get_orders():
    try:
        sql = "SELECT * FROM cart"
        cur.execute(sql)
        rows = cur.fetchall()
        return rows
    except Exception as e:
        return {"message": f"Error: {str(e)}"}


def add_cart(cart_item: CartItem):
    try:
        insert_query = (
            "INSERT INTO cart "
            "(id, title, price, amount) "
            "VALUES (%s, %s, %s, %s)"
        )
        cart_data = (
            cart_item.id,
            cart_item.title,
            cart_item.price,
            cart_item.amount,
        )
        cur.execute(insert_query, cart_data)
        cnx.commit()
        return {"message": "Cart item added successfully"}
    except Exception as e:
        # Log the error for debugging purposes
        print(f"Error adding cart item: {str(e)}")
        return {"message": f"Error: {str(e)}"}


def delete_cart(cart_item_id: int):
    try:
        delete_query = "DELETE FROM cart WHERE id = %s"
        cur.execute(delete_query, (cart_item_id,))
        cnx.commit()
        return {"message": "Cart item deleted successfully"}
    except Exception as e:
        return {"message": f"Error: {str(e)}"}

def make_order():
    try:
        cur.execute("SELECT id FROM cart")
        cart_ids = [item[0] for item in cur.fetchall()]
        bookIDs = ','.join(map(str, cart_ids))
        insert_query = (
            "INSERT INTO orders (bookIDs, orderdate, orderamount) "
            "VALUES (%s, %s, %s)"
        )
        cur.execute("select sum(price*amount) from cart;")
        totalAmount = cur.fetchone()[0]
        now = datetime.now()
        order_data = (bookIDs, now, totalAmount)
        cur.execute(insert_query, order_data)
        cnx.commit()
        return {"message": "Order made successfully"}
    except Exception as e:
        return {"message": f"Error: {str(e)}"}
