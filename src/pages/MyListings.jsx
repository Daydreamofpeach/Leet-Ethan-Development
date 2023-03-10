// Coded by Aya Saito

import { useState, useEffect, useContext } from "react";

import AccountContext from "../context/AccountContext";
import AuthContext from "../context/AuthContext";
import { useFetchItems } from "../hooks/useFetchItems";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import ItemCardRow from "../components/ItemCardRow";
import AccountMenu from "../components/AccountMenu";
import { useNavigate } from "react-router";
import EditIcon from "../components/ui/EditIcon";

export default function MyListings() {
  const { isLoggedIn } = useContext(AuthContext);
  const { accountData, setAccountData } = useContext(AccountContext);
  const { userId, name, profilePic, timestamp, wishlist, purchasedItems, soldItems } = accountData;

  const { getUsersItems, listings, isLoading: itemsIsLoading } = useFetchItems();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) getUsersItems(userId);
  }, [userId]);

  if (isLoggedIn && itemsIsLoading) {
    return <LoadingSpinner color="text-primary" />;
  }
  return (
    <div className="w-full h-full md:w-[90%] md:max-w-[1200px] md:flex md:justify-center md:gap-20 mx-auto md:px-10">
      <AccountMenu />
      <div className="w-[85%] mx-auto md:w-full">
        <h3 className="mb-9">My Listings</h3>
        <div>
          {listings &&
            listings.map(item => (
              <div key={item.itemId} className="relative">
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    navigate(`/item-detail/${item.itemId}`);
                  }}
                >
                  <ItemCardRow item={item} />
                </div>
                <div
                  className="flex items-end gap-2 absolute bottom-0 right-0 text-primary cursor-pointer"
                  onClick={() => {
                    navigate(`/edit-listing/${item.itemId}`);
                  }}
                >
                  <EditIcon size={20} showText />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
