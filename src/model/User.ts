interface UserID {
  id: string;
}

export interface User {
  id: string;
  memberId: number;
  nickname: string;
  nickName: string;
  imageUrl: string;
  profileUrl: string;
  image: string;
  Followers: UserID[];
  _count: {
    Followers: number;
    Followings: number;
  };
}
