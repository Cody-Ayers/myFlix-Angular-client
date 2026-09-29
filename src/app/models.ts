/** A movie as returned by the myFlix API */
export interface Movie {
  _id: string;
  Title: string;
  Description: string;
  ImageURL: string;
  Genre: { Name: string; Description: string };
  Director: {
    Name: string;
    Bio: string;
    BirthDate?: string | null;
    DeathDate?: string | null;
  };
}

/** A user as returned by the myFlix API */
export interface User {
  _id?: string;
  Username: string;
  Email: string;
  Birthday?: string | null;
  /** IDs of the movies this user has favorited */
  Favorites: string[];
}

/** Fields the user can submit when editing their profile */
export interface UserUpdate {
  Username: string;
  Password: string;
  Email: string;
  Birthday: string;
}
