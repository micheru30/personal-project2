update customer set customer_addresss_line_1=$2, customer_addresss_line_2=$3, customer_city=$4, customer_state=$5, customer_zipcode=$6, customer_phone=$7
where customer_id = $1;

select *
from customer
where customer_id = $1;