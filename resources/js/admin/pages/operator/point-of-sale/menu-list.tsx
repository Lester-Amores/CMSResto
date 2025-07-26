import type { Menu } from '@/admin/types';
import { getFullImageUrl } from '@/admin/lib/helpers';

interface MenuListProps {
  menus: Menu[];
  onSelect: (menu: Menu | null) => void;
  selectedMenuId?: number;
}

export default function MenuList({ menus, onSelect, selectedMenuId }: MenuListProps) {
  return (
    <div className="w-1/4 overflow-y-auto p-4 no-scrollbar bg-gray-100 shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]">
      <h2 className="font-bold mb-4 text-center text-2xl">Menu List</h2>
      <div className="space-y-3">
        <div
          className={`cursor-pointer h-8 rounded flex items-center justify-center font-semibold text-white transition ${selectedMenuId == null ? 'bg-red-700' : 'bg-gray-700 hover:bg-gray-700'
            }`}
          onClick={() => onSelect(null)}
        >
          SHOW ALL
        </div>

        {menus.map((menu) => {
          const isSelected = menu.id === selectedMenuId;

          return (
            <div
              key={menu.id}
              className={`cursor-pointer relative h-28 rounded-lg overflow-hidden transition-transform transform hover:scale-105 shadow-md ${isSelected ? 'ring-2 ring-red-500' : ''
                }`}
              onClick={() => onSelect(menu)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform"
                style={{
                  backgroundImage: `url(${getFullImageUrl(menu.img_src || '/placeholder.png')})`,
                }}
              />

              <div className="absolute inset-0 bg-black/50 backdrop-brightness-75" />

              <div className="relative z-10 flex items-center text-lg justify-center h-full hover:text-2xl">
                <span className="text-white font-semibold text-center px-2 uppercase">
                  {menu.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
