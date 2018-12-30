insert into customer_order (order_id, customer_id, item_id, quantity, order_date)
values ($1,$2,$3,$4,$5);

select * from customer_order
where order_id = $1