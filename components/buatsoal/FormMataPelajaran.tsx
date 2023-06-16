import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { useRecoilState } from "recoil"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { mataPelajaranState } from "@/lib/state"
import { mataPelajaran } from "@/lib/data"


const FormMataPelajaran = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = useRecoilState<string>(mataPelajaranState)
  const namaMapel = mataPelajaran.find((mapel) => mapel.nama.toLowerCase() === value)?.nama
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left h-14"
        >
          {value !== "" ? 
            (namaMapel?.toLocaleLowerCase() === value ?
              namaMapel 
              : 
              value)
            : 
            "Pilih Mata Pelajaran..."
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-80 w-[calc(100vw-2rem)] md:0 mx-auto max-w-screen-md p-0">
        <Command>
          <CommandInput 
            value={value}
            onValueChange={(currentValue) => {
              setValue(currentValue)
            }} 
            placeholder="Cari Mata Pelajaran..." 
          />
          <CommandEmpty className="py-0">
            <Button variant="ghost" className="h-full w-full" onClick={() => setOpen(false)}>Mata Pelajaran {value} tidak ada dalam daftar, tetap cari?</Button>
          </CommandEmpty>
          <CommandGroup className="h-40 overflow-y-scroll">
            {mataPelajaran.sort().map((mapel) => (
              <CommandItem
                key={mapel.nama}
                onSelect={(currentValue) => {
                  setValue(currentValue)
                  setOpen(false)
                }}
              >
                {mapel.nama}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FormMataPelajaran