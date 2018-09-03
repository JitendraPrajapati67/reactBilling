export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Main",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Agent",
      url: "/admin/agent",
      icon: "icon-user"
    },
    {
      name: "category",
      url: "/admin/category",
      icon: "fa fa-book"
    },
    {
      name: "product",
      url: "/admin/product",
      icon: "fa fa-product-hunt"
    },
    {
      name: "order",
      url: "/admin/order",
      icon: "icon-basket-loaded"
    },
    {
      name: "invoice",
      url: "/admin/invoice",
      icon: "icon-layers"
    },
    {
      name: "payment",
      url: "/admin/payment",
      icon: "icon-wallet"
    },
    {
      name: "report",
      url: "/admin/payment",
      icon: "icon-book-open"
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Extras"
    },
    {
      name: "Pages",
      url: "/pages",
      icon: "icon-star",
      children: [
        {
          name: "Login",
          url: "/login",
          icon: "icon-star"
        },
        {
          name: "Register",
          url: "/register",
          icon: "icon-star"
        },
        {
          name: "Error 404",
          url: "/404",
          icon: "icon-star"
        },
        {
          name: "Error 500",
          url: "/500",
          icon: "icon-star"
        }
      ]
    }
  ]
};
