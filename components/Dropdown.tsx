import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  FaCalendarCheck,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Link from "next/link";

interface DropdownProps {
  user?: KindeUser;
}

const Dropdown: React.FC<DropdownProps> = ({ user }) => {
  const noAvatarSrc = "../public/assets/logo/openart-2.svg";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center gap-2 cursor-pointer'>
          {/* avatar */}
          <Avatar>
            <AvatarImage src={user?.picture ?? noAvatarSrc} />
            <AvatarFallback className='bg-accent text-white'>
              {`${user?.given_name ?? "User"} ${user?.family_name ?? "User"}`}
            </AvatarFallback>
          </Avatar>
          {/* name & email */}
          <div>
            <div className='flex gap-1 font-bold'>
              <p>{user?.given_name}</p>
              <p>{user?.family_name}</p>
            </div>
            <p className='text-sm font-semibold'>{user?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-72 mt-4 p-4 flex flex-col gap-2'
        align='start'>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='flex flex-col gap-2'>
          <Link href='/'>
            <DropdownMenuItem>
              Homepage
              <DropdownMenuShortcut className='text-lg text-accent'>
                <FaHome />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href='/dashboard'>
            <DropdownMenuItem>
              My Bookings
              <DropdownMenuShortcut className='text-lg text-accent'>
                <FaCalendarCheck />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <LogoutLink>
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut className='text-lg text-accent'>
              <FaSignOutAlt />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </LogoutLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
