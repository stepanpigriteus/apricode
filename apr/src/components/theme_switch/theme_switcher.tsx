import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import treeStore from '../../strores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const ThemeToggleButton = () => {

    useEffect(() => {
        // Изменяем стиль body в зависимости от текущей темы
        document.body.style.backgroundColor = treeStore.isDarkTheme ? '' : '#171717';
        document.body.style.color = treeStore.isDarkTheme ? '#ffffff' : '#000000';
    }, [treeStore.isDarkTheme]);
    return (
        <button
            className={`fixed bottom-10 right-10 w-16 h-16 rounded-full flex items-center justify-center 
                ${treeStore.isDarkTheme ? 'bg-gray-700 text-yellow-400 ' : 'bg-gray-800 text-yellow-500'}`}
            onClick={() => treeStore.toggleTheme()}
        >
            {treeStore.isDarkTheme ? (
                <SunIcon className="w-8 h-8" /> 
            ) : (
                <MoonIcon className="w-8 h-8" />
            )}
        </button>
    );
};

export default observer(ThemeToggleButton);