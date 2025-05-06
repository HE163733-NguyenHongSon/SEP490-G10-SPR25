const apiUrl = process.env.NEXT_PUBLIC_API_URL;



const getRelativeTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
  return `${Math.floor(diff / 30)} months ago`;
};

const extractServiceFeedback = (list: IFeedback[]) =>
  list
    .filter((fb) => fb.serviceFeedbackContent)
    .map((fb) => ({
      id: fb.feedbackId,
      name: fb.patientName,
      image:fb.patientImage,
      targetName: fb.serviceName,
      timeAgo: getRelativeTime(fb.feedbackDate),
      rating: fb.serviceFeedbackGrade ?? 0,
      content: fb.serviceFeedbackContent,
    }));

const extractDoctorFeedback = (list: IFeedback[]) =>
  list
    .filter((fb) => fb.doctorFeedbackContent)
    .map((fb) => ({
      id: fb.feedbackId,
      name: fb.patientName,
      image:fb.patientImage,
      targetName: fb.doctorName,
      timeAgo: getRelativeTime(fb.feedbackDate),
      rating: fb.doctorFeedbackGrade ?? 0,
      content: fb.doctorFeedbackContent,
    }));

export const feedbackService = {
  extractServiceFeedback,
  extractDoctorFeedback,
  async getFeedbackList(): Promise<IFeedback[]> {
    try {
      const url = `${apiUrl}/api/Feedbacks`;
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        cache: 'no-store'
      });
      
      if (!res.ok) {
        console.error(`Feedback fetch failed with status: ${res.status}`);
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching feedback list:', error);
      // Trả về mảng rỗng để tránh crash UI
      return [];
    }
  },
};
