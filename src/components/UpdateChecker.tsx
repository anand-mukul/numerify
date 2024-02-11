import { useEffect } from 'react';

interface Props {
  onUpdateAvailable: Function;
}

const UpdateChecker: React.FC<Props> = ({ onUpdateAvailable }) => {
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
       const response = await fetch('https://numerify.pythonanywhere.com/api/version');
        const data = await response.json();
        const latestVersion = data.version;
        const lastVisitedVersion = localStorage.getItem('lastVisitedVersion');
        if (lastVisitedVersion !== latestVersion) {
          onUpdateAvailable();
          localStorage.setItem('lastVisitedVersion', latestVersion);
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    };

    checkForUpdates();
  }, [onUpdateAvailable]);

  return null;
};

export default UpdateChecker;