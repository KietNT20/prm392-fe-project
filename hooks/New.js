
import { newServices } from '@/services/newServices';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

// Hook để lấy tất cả tin tức
export const useGetAllNews = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allNews'],
    queryFn: () => newServices.getAllNews(),
    onSuccess: (response) => {
      console.log('News fetched successfully:', response);
    },
    onError: (error) => {
      console.error('Error fetching news:', error);
    },
  });

  return {
    news: data?.data || [], // Xử lý cấu trúc của response nếu cần thiết
    isLoading,
    isError,
    error,
  };
};

// Hook để lấy chi tiết một tin tức cụ thể theo ID
export const useNewDetail = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['newDetail', id],
    queryFn: () => newServices.getNewDetail(id),
    onSuccess: (response) => {
      console.log('News detail fetched:', response);
    },
    onError: (error) => {
      console.error('Error fetching news detail:', error);
    },
  });

  return {
    newsItem: data?.data || null, 
    isLoading,
    isError,
    error,
  };
};

// Hook để xóa một tin tức theo ID
export const useDeleteNew = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => newServices.deleteNew(id), // Giữ nguyên, ID được truyền vào body
    onSuccess: () => {
      console.log('News deleted successfully');
      queryClient.invalidateQueries(['allNews']); // Cập nhật lại danh sách tin tức
    },
    onError: (error) => {
      console.error('Error deleting news:', error);
    },
  });
};

export const useQueryNew = (name) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['queryNew', name], // Thay đổi khóa truy vấn để bao gồm tên
    queryFn: () => newServices.queryNew(name), // Gọi hàm queryNew từ newServices
    enabled: !!name, // Chỉ thực hiện truy vấn khi tên không phải là null hoặc undefined
    onSuccess: (response) => {
      console.log('News queried successfully:', response);
    },
    onError: (error) => {
      console.error('Error querying news:', error);
    },
  });

  return {
    news: data?.data || [], // Xử lý cấu trúc của response nếu cần thiết
    isLoading,
    isError,
    error,
  };
};