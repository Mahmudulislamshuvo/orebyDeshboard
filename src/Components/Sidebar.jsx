import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  ViewColumnsIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { FaFirstOrder, FaProductHunt, FaSalesforce } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";

const Sidebar = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <HomeIcon className="h-6 w-6" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Home
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to={"/banner"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ViewColumnsIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Banner
                  </ListItem>
                </Link>
                <Link to={"/category"}>
                  <ListItem>
                    <ListItemPrefix>
                      <CircleStackIcon className="h-6 w-6" />
                    </ListItemPrefix>
                    Category
                  </ListItem>
                </Link>
                <Link to={"/subcategory"}>
                  <ListItem>
                    <ListItemPrefix>
                      <TbCategoryPlus className="h-6 w-6" />
                    </ListItemPrefix>
                    Sub Category
                  </ListItem>
                </Link>
                <Link to={"/flashsale"}>
                  <ListItem>
                    <ListItemPrefix>
                      <FcSalesPerformance className="h-6 w-6" />
                    </ListItemPrefix>
                    Flash Sale
                  </ListItem>
                </Link>
                <Link to={"/bestselling"}>
                  <ListItem>
                    <ListItemPrefix>
                      <FaSalesforce className="h-6 w-6" />
                    </ListItemPrefix>
                    Best Selling
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  E-Commerce
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to={"/product"}>
                  <ListItem>
                    <ListItemPrefix>
                      <FaProductHunt className="h-5 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </Link>
              </List>
              <List className="p-0">
                <Link to={"/productlist"}>
                  <ListItem>
                    <ListItemPrefix>
                      <CiBoxList className="h-5 w-5" />
                    </ListItemPrefix>
                    Product List
                  </ListItem>
                </Link>
              </List>
              <List className="p-0">
                <Link to={"/order"}>
                  <ListItem>
                    <ListItemPrefix>
                      <FaFirstOrder className="h-5 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
