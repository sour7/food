import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetails from "../components/OrderDetails";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const cartData = useSelector((state) => state.cart);
  console.log("open", cash);
  const dispatch = useDispatch();
  const router = useRouter();
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/order", data);
      // console.log("res.stauts", res);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/order/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toatlAmount = (cartData.total / 90).toFixed(2);
  // This values are the props in the UI ---paypal
  const amount = toatlAmount;
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              console.log("details", details);
              const shipping = details.purchase_units[0].shipping;
              const add =
                shipping.address.address_line_1 +
                " " +
                shipping.address.address_line_2 +
                " " +
                details.purchase_units[0].shipping.address.admin_area_2 +
                " " +
                details.purchase_units[0].shipping.address.admin_area_1 +
                " " +
                details.purchase_units[0].shipping.address.postal_code;

              // console.log("addd", add);

              createOrder({
                customer: shipping.name.full_name,
                address: add,
                total: cartData.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>

            {cartData.products.map((product) => (
              <tr className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  {product.extras?.map((extra) => (
                    <span className={styles.extras}>{extra.text}</span>
                  ))}
                </td>
                <td>
                  <span className={styles.price}>₹{product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ₹{product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* total */}
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>₹{cartData.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>₹0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>₹{cartData.total}
          </div>

          {open ? (
            <div className={styles.payment}>
              <button
                className={styles.paymentcod}
                onClick={() => setCash(true)}
              >
                Cash On Delivery
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AXdKBdAl-R94slLJCPpOodNPZNYQmpnNiASDi0mxTc9UuGc2PmjA0S_omZ1eDla6koSjwc4jsvuFgnuQ",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetails
          total={cartData.total}
          createOrder={createOrder}
          setCash={setCash}
        />
      )}
    </div>
  );
};

export default Cart;
