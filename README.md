# Restorator 

[![Tests](https://github.com/Tomdatbenik/Restorator/actions/workflows/tests.yml/badge.svg)](https://github.com/Tomdatbenik/Restorator/actions/workflows/tests.yml)

What the goal of this project is to allow the following features to the developers:

we will take User models as example.

# Map
Mappings are used to parse/construct your models. While backend or other services require different names this would allow users to parse models to other models through the use of parse.

For example: 

### Your application
Your application might wants to use a third party api. Or you would like to have different calls based on DTO's that are constructed within forms.

Your application might have logic serounding a preference like CamelCasing but backend uses snake for their api. 

Resterator allows data to be parsed through the use of Models. We try to achieve something simmilar to how backend typescript frameworks fetch data. 

A exemple of mismatching services would be for example a user:

Your application has:
```typescript
class User {
  public string name: undefined;
}
```

but the service you want to pass data to uses:
```typescript
class User {
  public string display_name: undefined;
}
```

ofcourse you could make a DTO and have its constructer parse data for you. This is in our opinion tideous work and we would just want to have a user model that would support sending data to the backend.

Therefor we created these decorators to support this.

## Constructing a Model from Json
When extending a Model we allow a `.fromJson()` function which makes use of the following decorators: `@MapFrom`, `CastFrom()` 


### `@MapFrom()`
```typescript
class User extends Model{
  @MapFrom("display_name")
  public string name: undefined;
}

//json data
const json = '{ "display_name" : "Joe"}';

//static
const user = User.fromJson(json);

//with instance
const user = new User().fromJson(json);

//which would result in:
const user: User { name : "Joe"}
```

### `@CastFrom()`
```typescript
class User extends Model{
  @CastFrom("display_name", Boolean)
  public bool hasName: undefined;
}

//json data
const json = '{ "display_name" : "Joe"}';

//static
const user = User.fromJson(json);

//with instance
const user = new User().fromJson(json);

//which would result in:
const user: User { hasName : true}
```


## Map
```typescript
class User extends Model{
  @Map("display_name")
  public string name: undefined;
}

```



```typescript
// CRUD decoraters are default true 
@Updatable(false)

class User extends Model{
  //example for different names
  @MapFrom("display_name")
  @MapTo("display_name")
  @MapTo("first_name")
  @MapTo("has_name", {cast: Boolean})
  public string name: undefined;

  //Map for names that are same for From and To
  @Map("last_name")
  public sirName
}

```


