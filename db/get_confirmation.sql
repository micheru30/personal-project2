select i.item_name, co.quantity, i.item_price, i.item_color, i.item_image
from customer_order co
join item i on co.item_id = i.item_id
where co.order_id = $1