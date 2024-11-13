"use client"

import Loader from "@/components/loader"
import ObjectsList from "@/components/objects"
import { objectStore } from "@/store/objectStore"
import { objectType } from "@/types/objectType"
import { useEffect, useState, useMemo } from "react"

interface FilterOptions {
    selectedCategory: string;
    selectedState: string;
    selectedDate: string;
    sortOrder: string;
}

export default  function Objects(){

    const {recuperateObjects} =  objectStore()
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<FilterOptions>({
        selectedCategory: "",
        selectedState: "",
        selectedDate: "",
        sortOrder: ""
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                await recuperateObjects();
            } catch (error) {
                console.error('Error al cargar objetos:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        };
        
        loadData();
    }, []);

    const objects = objectStore(state => state.objects)
    const filterObjects = (objects: objectType[], filters: FilterOptions) => {
        const { selectedCategory, selectedState, selectedDate } = filters;
        return objects.filter(object => {
            const matchesCategory = selectedCategory ? object.category === selectedCategory : true;
            const matchesState = selectedState === "" ? true : object.state === (selectedState === "1");
            const matchesDate = selectedDate ? object.date && object.date.substring(0, 10) === selectedDate : true;
            return matchesCategory && matchesState && matchesDate;
        });
    }

    const sortObjects = (objects: objectType[], sortOrder: string) => {
        if (!sortOrder) return objects;
        return [...objects].sort((a, b) => {
            const comparison = a.name_object.localeCompare(b.name_object);
            return sortOrder === "asc" ? comparison : -comparison;
        });
    }

   
    const filteredAndSortedData = useMemo(() => {
        const filtered = filterObjects(objects, {
            selectedCategory: filters.selectedCategory,
            selectedState: filters.selectedState,
            selectedDate: filters.selectedDate,
            sortOrder: filters.sortOrder  
        });
        return sortObjects(filtered, filters.sortOrder);
    }, [objects, filters.selectedCategory, filters.selectedState, filters.selectedDate, filters.sortOrder]);

    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <main>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center">Objetos</h1>
            <p className="bg-[#E2E2E2] font-bold text-center py-12 text-xl mb-8">Aqui encontraras una amplia variedad de objetos perdidos y encontrados.</p>
            <h3 className="text-center font-bold text-2xl mb-2">Todos los objetos</h3>
            <div className="flex justify-between border-2 border-gray-200 mb-8 p-4 w-11/12 ml-auto mr-auto">
            <select
                    className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-1 bg-white"
                    value={filters.sortOrder}
                    onChange={(e) => handleFilterChange("sortOrder", e.target.value)} // Actualiza el estado del orden
                >
                    <option value="">Ordenar por</option>
                    <option value="asc">Nombre Ascendente</option>
                    <option value="desc">Nombre Descendente</option>
                </select>

                <select
                    className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-1 bg-white"
                    value={filters.selectedCategory}
                    onChange={(e) => handleFilterChange("selectedCategory", e.target.value)} // Actualiza el estado de la categoría seleccionada
                >
                    <option value="">Todas las categorías</option>
                    <option value="Accesorios Personales">Accesorios Personales</option>
                    <option value="Documentos y Tarjetas">Documentos y Tarjetas</option>
                    <option value="Electronica">Electrónica</option>
                    <option value="Ropa y Calzado">Ropa y Calzado</option>
                    <option value="Otro">Otro</option>
                </select>

                <select
                    className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-1 bg-white"
                    value={filters.selectedState}
                    onChange={(e) => handleFilterChange("selectedState", e.target.value)} // Actualiza el estado del estado seleccionado
                >
                    <option value="">Todos los estados</option>
                    <option value="0">Perdido</option>
                    <option value="1">Encontrado</option>
                </select>
                
                <div className="w-6/12 ml-5">
                    <label htmlFor="filter-date" className="">Filtrar por fecha:</label>
                    <input
                        type="date"
                        id="filter-date"
                        value={filters.selectedDate}
                        onChange={(e) => handleFilterChange("selectedDate", e.target.value)} // Actualiza el estado de la fecha seleccionada
                        className="border-2 border-gray-500 p-1 rounded ml-2"
                    />
                </div>
            </div>
        

            {
              loading ?  <Loader></Loader> :    
              objects.length > 0 ?  < ObjectsList objects={filteredAndSortedData} buttonText="Encontre tu objeto.Ir a WhatsApp" option={true} />  
                : <p className="text-center">No hay objetos Perdios</p>
            }
            
        </main>
    )
}
