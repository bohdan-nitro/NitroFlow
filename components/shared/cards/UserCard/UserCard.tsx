import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "@/components/ui/badge";
import RenderTag from "../../RenderTag/RenderTag";

interface UserCardProps {
  user: {
    _id: string;
    name: string;
    clerkId: string;
    picture: string;
    username: string;
  };
}

async function UserCard({ user }: UserCardProps) {
  const interectedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      className="shadow-light100_darknone max-xs:min-w-full xs:w-[260px] w-full"
      href={`/profile/${user.clerkId}`}>
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          alt="user profile picture"
          src={user.picture}
          width={100}
          height={100}
          className="rounded-full object-contain"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light800 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            {user.username}
          </p>
        </div>
        <div className="mt-5">
          {interectedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interectedTags.map((item) => (
                <RenderTag _id={item._id} key={item._id} name={item.name} />
              ))}
            </div>
          ) : (
            <div>
              <Badge>No tags yet</Badge>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export default UserCard;
