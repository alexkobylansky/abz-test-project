declare interface IUsers {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

declare interface resultProp {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string;
    prev_url: null | string;
  };
  users: IUsers[];
  message?: string;
  fails?: {
    count: [string];
    page: [string];
  };
}

declare interface IPosition {
  id: number;
  name: string
}

declare interface IPositions {
  success: boolean;
  positions: IPosition[]
}