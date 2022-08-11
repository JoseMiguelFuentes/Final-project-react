



.product-card{
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  position: relative;
  height: 100%;
}

.product-card a{
  text-decoration: none;
  display: block;
}

.product-card .image{
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--light-gray);
  position: relative;
}

.product-card .image .over{
  opacity: 0;
  position: absolute;
  transition: .8s;
  background: #fff;
}

.product-card .image:hover .over{
  opacity: 1;
}

.product-card .image img{
  height: 80%;
  width: 80%;
  object-fit: contain;
  margin: 0 auto;
  display: block;
}

.product-card .info{
  padding: 20px 20px 30px 20px;
}

.product-card .info *{
  display: block;
}

.product-card .info .brand{
  color: var(--gray);
  font-weight: 600;
  font-size: 1.1rem;
}

.product-card .info strong{
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.product-card .info .price{
  color: var(--gray);
}

.product-card .info .amount{
  font-weight: 600;
  font-size: 1.2rem;
  margin-left: 10px;
}

.product-card .cart-button{
  position: absolute;
  right: 30px;
  bottom: 30px;
  background: var(--primary);
  width: 50px;
  height: 50px;
  color: #fff;
  border-radius: 50%;
  font-size: 1.3rem;
  line-height: 0;
}