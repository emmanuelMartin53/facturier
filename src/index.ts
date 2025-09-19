import { FormInput } from "./classes/FormInputs";
import { Storage } from "./classes/Storage";
import * as _ from "lodash";


new FormInput();

Storage.checkLocaleStorage();
console.log("Donkey Geek est cool 3")


const comics = [
  "Superman",
  "Batman",
  "Wonder-woman"
]

const firstComic = _.first(comics)
const reverseComics = _.reverse(comics)
console.log(firstComic);
console.log(reverseComics);
