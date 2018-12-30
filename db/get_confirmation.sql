select co.order_id, i.item_name, co.quantity, i.item_price, i.item_color, i.item_image, c.customer_name, c.customer_addresss_line_1, c.customer_addresss_line_2, c.customer_city, c.customer_state, c.customer_zipcode
from customer_order co
join customer c on co.customer_id = c.customer_id
join item i on co.item_id = i.item_id
where co.order_id = $1