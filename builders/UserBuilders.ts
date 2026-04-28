export interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
}

export class UserBuilder {
  private user: User = {
    name: "Default Name",
    email: "default@example.com",
    password: "DefaultPass123!",
    phone: "555-0000",
    address: "123 Default St",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",
  };

  withName(name: string): this {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withPassword(password: string): this {
    this.user.password = password;
    return this;
  }

  withPhone(phone: string): this {
    this.user.phone = phone;
    return this;
  }

  withAddress(address: string): this {
    this.user.address = address;
    return this;
  }

  withCountry(country: string): this {
    this.user.country = country;
    return this;
  }

  withState(state: string): this {
    this.user.state = state;
    return this;
  }

  withCity(city: string): this {
    this.user.city = city;
    return this;
  }

  withZipcode(zipcode: string): this {
    this.user.zipcode = zipcode;
    return this;
  }

  build(): User {
    return { ...this.user };
  }
}
