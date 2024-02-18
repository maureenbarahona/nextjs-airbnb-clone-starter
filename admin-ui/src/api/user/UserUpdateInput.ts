import { ListingWhereUniqueInput } from "../listing/ListingWhereUniqueInput";
import { InputJsonValue } from "../../types";
import { TripUpdateManyWithoutUsersInput } from "./TripUpdateManyWithoutUsersInput";
import { WishlistUpdateManyWithoutUsersInput } from "./WishlistUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  firstName?: string | null;
  lastName?: string | null;
  listings?: ListingWhereUniqueInput | null;
  password?: string;
  roles?: InputJsonValue;
  trips?: TripUpdateManyWithoutUsersInput;
  username?: string;
  wishlists?: WishlistUpdateManyWithoutUsersInput;
};
