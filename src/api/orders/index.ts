import {  InsertTables } from './../../types';
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({archived = false}) => {
    
    const statuses = archived ? ['Delivered'] : ['New','Cooking','Delivering']
    
    
    return useQuery({
        queryKey: ['orders', { archived }],
        queryFn: async() => {
          const { data, error } = await supabase.from('orders').select('*').in('status',statuses);
          if(error)
            {
              throw new Error(error.message);
            }
            return data;
        }
      });
}


export const useMyOrderList = () => {
    
    const { session } = useAuth();

    const id = session?.user.id;

    return useQuery({
        queryKey: ['orders', { userId: id}],
        queryFn: async() => {

          if(!id)
            {
                return null;
            }  

          const { data, error } = await supabase.from('orders').select('*').eq('user_id',id);
          if(error)
            {
              throw new Error(error.message);
            }
            return data;
        }
      });
}


export const useOrderDetails = (id: number) => {
    return useQuery({
      queryKey: ['orders', id],
      queryFn: async() => {
        const { data, error } = await supabase.from('orders').select('*').eq('id',id).single();
        
        if(error)
          {
            throw new Error(error.message);
          }
        
          return data;
        
      }
    });
  }
  

  export const useInsertOrder = () => {
  
    const queryClient = useQueryClient();
  
    const { session } = useAuth();

    const userId = session?.user.id;

    return useMutationState({
        async mutationFn(data: InsertTables<'orders'>)
        {
          const { error, data: newProduct } = await supabase.from('orders').insert({user_id: userId,...data}).select().single();
  
          if(error)
            {
              throw new Error(error.message);
            }
  
          return newProduct;
        },
        async onSuccess()
        {
          await queryClient.invalidateQueries(['products']);
        },
      })
  }
  
  