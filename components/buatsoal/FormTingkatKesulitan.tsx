import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../ui/menubar"
import { buttonVariants } from "../ui/button"
import { sd, smp, sma } from "@/lib/data"
import { tingkatKesulitanState } from "@/lib/state"
import { useRecoilState } from "recoil"
import { ChevronDown } from "lucide-react"

const FormTingkatKesulitan = () => {
  const [value, setValue] = useRecoilState<string>(tingkatKesulitanState)

  return (
    <Menubar className="w-full">
      <MenubarMenu>
        <MenubarTrigger className={`${buttonVariants({variant: "outline"})} font-normal flex flex-row justify-between w-full`}>
          {value}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => setValue("Umum")}>Umum</MenubarItem>
          <MenubarSeparator />
          {/* SD */}
          <MenubarSub>
            <MenubarSubTrigger>SD</MenubarSubTrigger>
            <MenubarSubContent>
              {sd.map((item) => (
                <MenubarItem onSelect={() => setValue(item.value)}>{item.label}</MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          {/* SMP */}
          <MenubarSub>
            <MenubarSubTrigger>SMP</MenubarSubTrigger>
            <MenubarSubContent>
              {smp.map((item) => (
                <MenubarItem onSelect={() => setValue(item.value)}>{item.label}</MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          {/* SMA */}
          <MenubarSub>
            <MenubarSubTrigger>SMA</MenubarSubTrigger>
            <MenubarSubContent>
              {sma.map((item) => (
                <MenubarItem onSelect={() => setValue(item.value)}>{item.label}</MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export default FormTingkatKesulitan