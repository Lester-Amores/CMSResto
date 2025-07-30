import type { Menu } from '@/admin/types';
import { getFullImageUrl } from '@/admin/lib/helpers';

interface MenuListProps {
  menus: Menu[];
  onSelect: (menu: Menu | null) => void;
  selectedMenuId?: number;
}

export default function MenuList({ menus, onSelect, selectedMenuId }: MenuListProps) {
  return (
    <div className="flex gap-3 items-center overflow-x-auto no-scrollbar p-4">
      {menus.map((menu) => {
        const isSelected = menu.id === selectedMenuId;

        const handleClick = () => {
          if (isSelected) {
            onSelect(null);
          } else {
            onSelect(menu);
          }
        };

        return (
          <div
            key={menu.id}
            className={`w-full h-24 cursor-pointer relative min-w-[160px] rounded-lg overflow-hidden transition-transform transform hover:scale-105 shadow-md ${isSelected ? 'ring-3 ring-blue-500' : ''
              }`}
            onClick={handleClick}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${getFullImageUrl(menu.img_src || '/placeholder.png')})`,
              }}
            />
            <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <span className="text-white font-semibold text-center px-2 uppercase text-sm">
                {menu.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
