import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { GetTutors } from "../api/getTutors";

const tutors = await GetTutors();

export default function RequestForm() {
  const [selected, setSelected] = useState(tutors[1]);
  const [requestMessage, setRequestMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending the request
    setRequestMessage("We've sent your request. Please wait for tutor to respond.");
  };

  return (
    <div className="h-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-16 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 mb-4 text-center text-blue-950 text-2xl/9 font-bold tracking-tight text-gray-900">
            Request Availability from a Tutor
          </h2>
        </div>
        <Listbox value={selected} onChange={setSelected}>
          <Label className="block text-sm/6 font-medium text-gray-900">
            Select Tutor
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm/6">
              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                <span className="block truncate">
                  {selected.tutor_name}{" "}
                  {selected.courses && selected.courses.length > 0 && (
                    <span className="text-gray-500 text-sm ml-1">
                      ({selected.courses.join(", ")})
                    </span>
                  )}
                </span>
              </span>
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {tutors.map((person) => (
                <ListboxOption
                  key={person.tutor_id}
                  value={person}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-800 data-[focus]:text-white data-[focus]:outline-none"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                      {person.tutor_name}
                      {person.courses && person.courses.length > 0 && (
                        <span className="text-gray-500 text-sm ml-1">
                          ({person.courses.join(", ")})
                        </span>
                      )}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-800 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <div className="h-full mt-8">
          <div className="flex items-center rounded-md bg-white has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-800">
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Please include your McGill email, the course and the time you're requesting in your request."
              className="pb-24 block min-w-0 grow pl-2 py-2 focus:outline-none outline-none text-base text-gray-900 placeholder:text-gray-400 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit} 
            className="mt-4 flex w-1/3 justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            Send Availability Request
          </button>
          {requestMessage && (
            <p className="mt-2 text-green-600 text-sm">{requestMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
