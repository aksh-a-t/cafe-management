
export const FeatureIds = {
    "Category Manipulation":81,
    "Product Manipulation":82,
    "Billing":83,
    "Chef Console":84,
    "Tables Information":85,
    "Support Tools":86,
    "Product Toggle":87,
    "Analytics":88
}
export const RoleTemplates = [
    {
        template:"Admin",
        features:[...Object.keys(FeatureIds)]
    },
    {
        template:"Chef",
        features:["Chef Console"]
    },
    {
        template:"Manager",
        features:["Tables Information"]
    },
    {
        template:"Reception",
        features:["Billing"]
    },
    {
        template:"Menu Manipulator",
        features:["Category Manipulation","Product Manipulation"]
    },
    {
        template:"Custom",
    }
]
export const INTERNAL_USERS_CREATE_VIEW = "Create";
export const INTERNAL_USERS_EDIT_VIEW = "Edit";
// export const Features=[
//     {
//         //0
//         id:FeatureIds.Category,
//         Name:"Category Manipulation"
//     },
//     {
//         //1
//         id:FeatureIds.Product,
//         Name:"Product Manipulation"
//     },
//     {
//         //2
//         id:FeatureIds.Bill,
//         Name:"Bill Creation"
//     },
//     {
//         //3
//         id:FeatureIds.Chef,
//         Name:"Chef's Console"
//     },
//     {
//         //4
//         id:FeatureIds.Tables,
//         Name:"Tables Information"
//     },
//     {
//         //5
//         id:FeatureIds.Support,
//         Name:"Support Tools"
//     }
// ]
