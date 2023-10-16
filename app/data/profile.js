export const sidebarData = [
	{
		heading: "My Account",
		links: [
			{
				name: "My Profile",
				link: "/profile",
			},
			{
				name: "Addresses",
				link: "/profile/address",
			},
			{
				name: "My Payment Options",
				link: "/profile/payment",
			},
			{
				name: "Account Security",
				link: "/profile/security",
			},
		],
	},
	{
		heading: "My Orders",
		links: [
			{
				name: "All Orders",
				link: "/profile/orders",
				filter: "",
			},
			{
				name: "Paid Orders",
				link: "/profile/orders",
				filter: "paid",
			},
			{
				name: "Unpaid Orders",
				link: "/profile/orders",
				filter: "unpaid",
			},
			{
				name: "Unprocessed Orders",
				link: "/profile/orders",
				filter: "Not Processed",
			},
			{
				name: "Cancelled Orders",
				link: "/profile/orders",
				filter: "Cancelled",
			},
		],
	},
	{
		heading: "My Lists",
		links: [
			{
				name: "Whishlist",
				link: "/profile/wishlist",
			},
			{
				name: "Recently Viewed",
				link: "/profile/recent",
			},
		],
	},
	{
		heading: "Sign out",
		link: [],
	},
];

export const ordersLinks = [
	{
		name: "All Orders",
		filter: "",
	},
	{
		name: "Paid Orders",
		filter: "paid",
	},
	{
		name: "Unpaid Orders",
		filter: "unpaid",
	},
	{
		name: "Unprocessed Orders",
		filter: "Not Processed",
	},
	{
		name: "Cancelled Orders",
		filter: "Cancelled",
	},
];
